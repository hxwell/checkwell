package hx.well.config;
import hx.well.provider.BootProvider;
import hx.well.provider.AbstractProvider;
import hx.well.provider.CreateDatabaseProvider;
class ProviderConfig implements IConfig {
    public function new() {}

    public function get():Array<Class<AbstractProvider>> {
        return [
            CreateDatabaseProvider,
            BootProvider
        ];
    }
}