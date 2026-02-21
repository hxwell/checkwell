package hx.well.provider;
import hx.well.route.Route;
import hx.well.facades.Environment.env;
import hx.well.route.ApiRoute;
import hx.well.route.OrganizationRoute;
import hx.well.route.WebRoute;
import hx.well.facades.DBStatic;
import hx.well.route.DashboardRoute;
import hx.well.facades.Inertia;

class BootProvider extends AbstractProvider {
	public function boot():Void {
		sys.Http.PROXY = {host: "127.0.0.1", port: 8888, auth: null};

		var appDomain:String = env("APP_DOMAIN");
		Inertia.getSharedProps().set("appDomain", appDomain);

		// Dash Route
		Route.domain('dash.${appDomain}')
			.group(DashboardRoute);

		// API Route
		Route.domain('api.${appDomain}')
            .group(ApiRoute);

		// Public Organization Page (if it's not available redirect to login)
		Route.domain('{organization}.${appDomain}')
            .group(OrganizationRoute);

		// Public Page
		Route.domain(appDomain)
            .group(WebRoute);
	}
}
