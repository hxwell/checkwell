package hx.well.middleware;
import hx.well.facades.Inertia;
import hx.well.facades.Environment.Environment.env;
import hx.well.http.Response;
import hx.well.http.Request;
class SetSharedPropsMiddleware extends AbstractMiddleware {
    public function handle(request:Request, next:(Request) -> Null<Response>):Null<Response> {
        var appDomain:String = env("APP_DOMAIN");
        Inertia.getSharedProps().set("appDomain", appDomain);

        if(request.user() != null) {
            Inertia.getSharedProps().set("auth", {
                "user": request.user()
            });
        } else {
            Inertia.getSharedProps().set("auth", {
                "user": null
            });
        }
        return next(request);
    }
}