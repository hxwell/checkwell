package hx.well.model;

import hx.well.model.BaseModel;
import hx.well.auth.IAuthenticatable;
import uuid.Uuid;
import uuid.Uuid.Uuid.v4;
import haxe.crypto.random.SecureRandom;
import haxe.crypto.random.SecureRandom.SecureRandom.range;

@:connection("default")
@:table("organizations")
@:build(hx.well.macro.ModelMacro.build())
class Organization extends BaseModel<Organization> {
    public static var query:BaseModelQuery<Organization>;

    // UUID
    @:primary
    @:visible
    @:field
    public var id:String;

    @:visible
    @:field
    public var slug:String;

    @:visible
    @:field
    public var name:String;

    public function new() {
        super();
    }

    public static function findBySlug(slug:String):Null<Organization> {
        return query.where("slug", slug).first();
    }

    public function isMember(user:IAuthenticatable):Bool {
        return OrganizationUser.query.where(["organization_id" => id, "user_id" => user.getId()]).exists();
    }

    public override function primaryKeyFactory():Dynamic {
        return Uuid.v4(null, () -> {
            return SecureRandom.range(0, 255);
        });
    }
}