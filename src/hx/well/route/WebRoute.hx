package hx.well.route;
import hx.well.facades.Inertia;
using hx.well.tools.RouteElementTools;

class WebRoute extends RouteGroup {
    public function new() {
        super();
    }

    public function template():Void {
        Route.get("/").handle((request) -> Inertia.render("landing"));
    }
}
