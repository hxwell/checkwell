package hx.well.config;
import hx.well.middleware.DatabaseMiddleware;
import hx.well.middleware.AbstractMiddleware;
import hx.well.middleware.SessionAuthMiddleware;
import hx.well.middleware.CorsMiddleware;
import hx.well.middleware.CustomSessionMiddleware;
import hx.well.middleware.SetSharedPropsMiddleware;

class MiddlewareConfig implements IConfig {
    public function new() {}

    public function get():Array<Class<AbstractMiddleware>> {
        return [
            CorsMiddleware,
            DatabaseMiddleware,
            CustomSessionMiddleware,
            SessionAuthMiddleware,
            SetSharedPropsMiddleware
        ];
    }
}