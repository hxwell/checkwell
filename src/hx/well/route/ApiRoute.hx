package hx.well.route;
import hx.well.http.Request;
import hx.well.facades.Inertia;
import hx.well.facades.Inertia.Inertia.render;
import hx.well.handler.api.LoginHandler;
import hx.well.handler.api.RegisterHandler;
import hx.well.handler.api.organization.CreateOrganizationHandler;
import hx.well.handler.dashboard.organization.OrganizationListHandler;
import hx.well.handler.api.organization.DeleteOrganizationHandler;
import hx.well.middleware.CheckOrganizationMiddleware;
using hx.well.tools.RouteElementTools;

class ApiRoute extends RouteGroup {
    public function new() {
        super();
    }

    public function template():Void {
        Route.post("/login").handler(new LoginHandler());
        Route.post("/register").handler(new RegisterHandler());

        Route.any("/organization").group(() -> {
            Route.post("/create").handler(new CreateOrganizationHandler());
            Route.any("/{organization}").middleware([CheckOrganizationMiddleware]).group(() -> {
                Route.post("/delete").handler(new DeleteOrganizationHandler());
            });
        });
    }
}
