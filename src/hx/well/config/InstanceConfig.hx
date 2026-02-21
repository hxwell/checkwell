package hx.well.config;
import hx.well.server.instance.IInstance;
import hx.well.http.driver.undertow.UndertowInstance;
import hx.well.http.driver.undertow.UndertowExtern;

class InstanceConfig implements IConfig {
    public function new() {}

    public function get():Array<IInstance> {
        return [
            UndertowInstance.builder()
            .setJksPath("keystore.jks")
            .setStorePassword("password")
            .setKeyPassword("password")
            .setServerOption(UndertowOptionsExtern.ENABLE_HTTP2, true)
            .setHost("0.0.0.0")
            .setPort(3000)
            .setSsl(true)
            .build()
        ];
    }
}