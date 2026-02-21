package hx.well.route;
import hx.well.http.Request;
using hx.well.tools.RouteElementTools;

class OrganizationRoute extends RouteGroup {
    public function new() {
        super();
    }

    public function template():Void {
        // Public Page (if it's not available redirect to login)
        // Dashboard
        // Members
        // API Keys
        // Projects

        Route.get("/").handle((request:Request) -> {
            return request.route("organization");
        });
    }
}
