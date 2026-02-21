package hx.well.handler.api.organization;

import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.model.User;
import hx.well.model.Organization;
import uuid.Uuid;
import uuid.Uuid.Uuid.v4;
import haxe.crypto.random.SecureRandom;
import haxe.crypto.random.SecureRandom.SecureRandom.range;
import hx.well.validator.ValidatorRule;
import hx.well.http.RequestStatic.RequestStatic.request;
import hx.well.facades.DBStatic;
import hx.well.model.OrganizationUser;

class CreateOrganizationHandler extends AbstractHandler {
	public override function validate():Bool {
		return request().validate([
			"name" => [ValidatorRule.Required, ValidatorRule.String],
			"slug" => [
				ValidatorRule.Required,
				ValidatorRule.String,
				ValidatorRule.Min(3),
				ValidatorRule.Max(24),
				ValidatorRule.Regex("^[a-z]([a-z0-9-]*[a-z0-9])?$")
			],
		]);
	}

	public function execute(request:Request):AbstractResponse {
		var user:User = request.user();
		var name:String = request.input("name");
		var slug:String = request.input("slug");

		if (Organization.query.where("slug", slug).exists()) {
			return {
				"success": false,
				"message": "Organization with this slug already exists"
			};
		}

		var organization:Organization = null;
		DBStatic.transaction(() -> {
			organization = Organization.query.create(["name" => name, "slug" => slug]);
			OrganizationUser.query.create(["user_id" => user.id, "organization_id" => organization.id, "role" => "owner"]);
		});

		return {
			"success": true,
			"message": "Organization created successfully",
			"organization": organization
		};
	}
}
