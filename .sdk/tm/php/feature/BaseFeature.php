<?php
declare(strict_types=1);

// FinancialData SDK base feature

class FinancialDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FinancialDataContext $ctx, array $options): void {}
    public function PostConstruct(FinancialDataContext $ctx): void {}
    public function PostConstructEntity(FinancialDataContext $ctx): void {}
    public function SetData(FinancialDataContext $ctx): void {}
    public function GetData(FinancialDataContext $ctx): void {}
    public function GetMatch(FinancialDataContext $ctx): void {}
    public function SetMatch(FinancialDataContext $ctx): void {}
    public function PrePoint(FinancialDataContext $ctx): void {}
    public function PreSpec(FinancialDataContext $ctx): void {}
    public function PreRequest(FinancialDataContext $ctx): void {}
    public function PreResponse(FinancialDataContext $ctx): void {}
    public function PreResult(FinancialDataContext $ctx): void {}
    public function PreDone(FinancialDataContext $ctx): void {}
    public function PreUnexpected(FinancialDataContext $ctx): void {}
}
