package hx.well.handler.dashboard.organization;
import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.model.User;
import hx.well.facades.Inertia;
class OrganizationListHandler extends AbstractHandler {

    public function execute(request:Request):AbstractResponse {
        var user:User = request.user();
        var organizations = user.organizations();
        return Inertia.render("organization.list", [
            "organizations" => organizations
        ]);
    }
}
