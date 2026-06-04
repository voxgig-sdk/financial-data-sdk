package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/financial-data-sdk/go"
	"github.com/voxgig-sdk/financial-data-sdk/go/core"

	vs "github.com/voxgig-sdk/financial-data-sdk/go/utility/struct"
)

func TestMiscellaneousDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.MiscellaneousData(nil)
		if ent == nil {
			t.Fatal("expected non-nil MiscellaneousDataEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := miscellaneous_dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "miscellaneous_data." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FINANCIALDATA_TEST_MISCELLANEOUS_DATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		miscellaneousDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.miscellaneous_data", setup.data)))
		var miscellaneousDataRef01Data map[string]any
		if len(miscellaneousDataRef01DataRaw) > 0 {
			miscellaneousDataRef01Data = core.ToMapAny(miscellaneousDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = miscellaneousDataRef01Data

		// LOAD
		miscellaneousDataRef01Ent := client.MiscellaneousData(nil)
		miscellaneousDataRef01MatchDt0 := map[string]any{}
		miscellaneousDataRef01DataDt0Loaded, err := miscellaneousDataRef01Ent.Load(miscellaneousDataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if miscellaneousDataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func miscellaneous_dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "miscellaneous_data", "MiscellaneousDataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read miscellaneous_data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse miscellaneous_data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"miscellaneous_data01", "miscellaneous_data02", "miscellaneous_data03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FINANCIALDATA_TEST_MISCELLANEOUS_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FINANCIALDATA_TEST_MISCELLANEOUS_DATA_ENTID": idmap,
		"FINANCIALDATA_TEST_LIVE":      "FALSE",
		"FINANCIALDATA_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FINANCIALDATA_TEST_MISCELLANEOUS_DATA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FINANCIALDATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFinancialDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FINANCIALDATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FINANCIALDATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
