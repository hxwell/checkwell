package hx.well.route;
import hx.well.facades.Inertia;
import hx.well.middleware.CheckOrganizationMiddleware;
import hx.well.handler.dashboard.organization.OrganizationListHandler;
import hx.well.handler.dashboard.organization.OrganizationDetailsHandler;
import hx.well.http.ResponseBuilder;
import hx.well.http.RequestStatic.auth;
using hx.well.tools.RouteElementTools;

class DashboardRoute extends RouteGroup {
    public function new() {
        super();
    }

    public function template():Void {
        Route.get("/login").handle((request) -> Inertia.render("login"));
        Route.get("/register").handle((request) -> Inertia.render("register"));

        Route.get("/").handler(new OrganizationListHandler());
        Route.any("/organization/{organization}").middleware([CheckOrganizationMiddleware]).group(() -> {
            Route.get("/").handler(new OrganizationDetailsHandler());
        });

        Route.get("/logout").handle((request) -> {
            auth().logout();
            return ResponseBuilder.asRedirect("/login");
        });
    }
}
