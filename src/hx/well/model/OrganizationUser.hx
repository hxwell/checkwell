package hx.well.model;

import hx.well.model.BaseModel;

@:connection("default")
@:table("organization_users")
class OrganizationUser extends BaseModel<OrganizationUser> {
    public static var query:BaseModelQuery<OrganizationUser> = useQuery();

    // UUID
    @:primary
    @:visible
    @:field
    public var id:String;

    @:visible
    @:field
    public var user_id:String;

    @:visible
    @:field
    public var organization_id:String;

    public function new() {
        super();
    }

    public function getId():Dynamic {
        return id;
    }
}