package hx.well.handler.dashboard.organization;
import hx.well.facades.Inertia;
import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.model.User;
import hx.well.model.Organization;
class OrganizationDetailsHandler extends AbstractHandler {

    public function execute(request:Request):AbstractResponse {
        var organization:Organization = request.getAttribute("organization");
        return Inertia.render("organization.details", [
            "organization" => organization
        ]);
    }
}
