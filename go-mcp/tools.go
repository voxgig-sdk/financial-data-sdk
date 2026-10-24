package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/financial-data-sdk/go"
)

// ListArgs is what an agent sends to financial-data_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: market_data | symbol_list"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to financial-data_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: basic_information | crypto_currency | derivatives_data | esg_data | etf_data | event_calendar | financial_ratio | financial_statement | forex_data | insider_trading | institutional_trading | investment_adviser | market_data | market_index | market_new | miscellaneous_data | mutual_fund"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.FinancialDataSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "financial-data_list",
		Description: "List records from FinancialData. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("market_data", "symbol_list"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "financial-data_load",
		Description: "Load one record from FinancialData. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("basic_information", "crypto_currency", "derivatives_data", "esg_data", "etf_data", "event_calendar", "financial_ratio", "financial_statement", "forex_data", "insider_trading", "institutional_trading", "investment_adviser", "market_data", "market_index", "market_new", "miscellaneous_data", "mutual_fund"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.FinancialDataSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.FinancialDataSDK, name string) (sdk.FinancialDataEntity, error) {
	switch strings.ToLower(name) {
	case "basic_information":
		return client.BasicInformation(nil), nil
	case "crypto_currency":
		return client.CryptoCurrency(nil), nil
	case "derivatives_data":
		return client.DerivativesData(nil), nil
	case "esg_data":
		return client.EsgData(nil), nil
	case "etf_data":
		return client.EtfData(nil), nil
	case "event_calendar":
		return client.EventCalendar(nil), nil
	case "financial_ratio":
		return client.FinancialRatio(nil), nil
	case "financial_statement":
		return client.FinancialStatement(nil), nil
	case "forex_data":
		return client.ForexData(nil), nil
	case "insider_trading":
		return client.InsiderTrading(nil), nil
	case "institutional_trading":
		return client.InstitutionalTrading(nil), nil
	case "investment_adviser":
		return client.InvestmentAdviser(nil), nil
	case "market_data":
		return client.MarketData(nil), nil
	case "market_index":
		return client.MarketIndex(nil), nil
	case "market_new":
		return client.MarketNew(nil), nil
	case "miscellaneous_data":
		return client.MiscellaneousData(nil), nil
	case "mutual_fund":
		return client.MutualFund(nil), nil
	case "symbol_list":
		return client.SymbolList(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
