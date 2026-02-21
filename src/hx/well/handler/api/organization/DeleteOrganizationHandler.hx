package hx.well.handler.api.organization;
import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.http.RequestStatic.request;
import hx.well.validator.ValidatorRule;
import hx.well.model.Organization;

class DeleteOrganizationHandler extends AbstractHandler {
    public override function validate():Bool {
        return request().validate([
            "slug" => [
            ValidatorRule.Required,
            ValidatorRule.String
        ],
        ]);
    }

    public function execute(request:Request):AbstractResponse {
        var organization:Organization = request.getAttribute("organization");
        var organizationSlugInput:String = request.input("slug");

        if (organization.slug != organizationSlugInput) {
            return {
                success: false,
                "message": "Organization slug in the route does not match the slug in the request body.",
            }
        }

        organization.delete();

        return {
            success: true,
            message: "Organization deleted successfully.",
        }
    }
}