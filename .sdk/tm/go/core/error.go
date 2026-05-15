package core

type FinancialDataError struct {
	IsFinancialDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFinancialDataError(code string, msg string, ctx *Context) *FinancialDataError {
	return &FinancialDataError{
		IsFinancialDataError: true,
		Sdk:              "FinancialData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FinancialDataError) Error() string {
	return e.Msg
}
