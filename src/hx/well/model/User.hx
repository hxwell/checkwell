package hx.well.model;
import hx.well.auth.IAuthenticatable;
import hx.well.model.BaseModel;
import uuid.Uuid;
import haxe.crypto.random.SecureRandom;
import uuid.Uuid.Uuid.v4;
import haxe.crypto.random.SecureRandom.SecureRandom.range;

@:connection("default")
@:table("users")
class User extends BaseModel<User> implements IAuthenticatable {
    public static var query:BaseModelQuery<User> = useQuery();

    @:primary
    @:field
    public var id:String;

    @:visible
    @:field
    public var fullname:String;

    @:visible
    @:field
    public var email:String;

    @:field
    public var password:String;

    public function new() {
        super();
    }

    public function getId():Dynamic {
        return id;
    }

    public function getPassword():String {
        return password;
    }

    public static function findByEmail(email:String):Null<User> {
        return User.query.where("email", email).first();
    }

    public function organizations():Array<Organization> {
        return Organization.query
            .join("INNER", "organization_users", "organizations.id", "=", "organization_users.organization_id")
            .where("organization_users.user_id", this.id)
            .select(["organizations.*"])
            .get();
    }

    public override function primaryKeyFactory():Dynamic {
        return Uuid.v4(null, () -> {
            return SecureRandom.range(0, 255);
        });
    }
}