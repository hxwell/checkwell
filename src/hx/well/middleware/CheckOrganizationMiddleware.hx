package hx.well.middleware;
import hx.well.http.Response;
import hx.well.http.Request;
import hx.well.model.Organization;

class CheckOrganizationMiddleware extends AbstractMiddleware {

    public function handle(request:Request, next:Request->Response):Response {
        var slug:String = request.route("organization");
        var organization:Organization = Organization.query.where("slug", slug).first();
        if (organization == null || !organization.isMember(request.user())) {
            abort(401);
        }

        request.setAttribute("organization", organization);

        return next(request);
    }
}
