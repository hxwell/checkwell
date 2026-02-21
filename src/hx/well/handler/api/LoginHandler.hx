package hx.well.handler.api;

import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.http.RequestStatic.request;
import hx.well.validator.ValidatorRule;
import hx.well.http.ResponseBuilder;
import hx.well.http.RequestStatic.auth;
import haxe.ds.StringMap;
import hx.well.facades.Config.config;

class LoginHandler extends AbstractHandler {
	public override function validate():Bool {
		return request().validate([
			"email" => [ValidatorRule.Required, ValidatorRule.String, ValidatorRule.Email],
			"password" => [
				ValidatorRule.Required,
				ValidatorRule.String,
				ValidatorRule.Min(6),
				ValidatorRule.Max(32)
			],
		]);
	}

	public function execute(request:Request):AbstractResponse {
		trace(config("session.lifetime"));

		var credentials:StringMap<Dynamic> = request.only("email", "password");
		if (!auth().attempt(credentials)) {
			return ResponseBuilder.asJson({
				status: "error",
				message: "Invalid email or password."
			}, 401);
		}
		return {
			status: "success",
			message: "User logged in successfully."
		};
	}
}
