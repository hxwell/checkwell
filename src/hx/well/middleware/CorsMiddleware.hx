package hx.well.middleware;

import hx.well.http.RequestStatic.request;
import hx.well.facades.Environment.env;

using StringTools;

class CorsMiddleware extends AbstractCorsMiddleware {
	public function allowedOrigins():Array<String> {
		var domain:String = env("APP_DOMAIN");

		var origin:String = request().header("Origin");

		if (origin.endsWith(domain)) {
			return [origin];
		}

		return ["*"];
	}

	override public function allowCredentials():Bool {
		return true;
	}

	override public function maxAge():Int {
		return 3600;
	}
}
