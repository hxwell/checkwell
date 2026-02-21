package hx.well.handler.api;
import hx.well.http.AbstractResponse;
import hx.well.http.Request;
import hx.well.http.RequestStatic.request;
import hx.well.validator.ValidatorRule;
import hx.well.http.ResponseBuilder;
import hx.well.model.User;
import uuid.Uuid;
import haxe.crypto.random.SecureRandom;
import hx.well.facades.DBStatic;
import hx.well.http.RequestStatic.auth;
import hx.well.facades.Hash;
class RegisterHandler extends AbstractHandler {
    public override function validate():Bool {
        return request().validate([
            "name" => [ValidatorRule.Required, ValidatorRule.String, ValidatorRule.Min(1)],
            "email" => [ValidatorRule.Required, ValidatorRule.String, ValidatorRule.Email],
            "password" => [ValidatorRule.Required, ValidatorRule.String, ValidatorRule.Min(6), ValidatorRule.Max(32)],
            "password_confirmation" => [ValidatorRule.Required, ValidatorRule.String, ValidatorRule.Min(6), ValidatorRule.Max(32)]
        ]);
    }

    public function execute(request:Request):AbstractResponse {
        var fullname:String = request.input("name");
        var email:String = request.input("email");
        var password:String = request.input("password");
        var confirmPassword:String = request.input("password_confirmation");

        if(password != confirmPassword) {
            return ResponseBuilder.asJson({
                status: "error",
                message: "Passwords do not match."
            }, 400);
        }

        var user:Null<User> = User.findByEmail(email);
        if(user != null) {
            return ResponseBuilder.asJson({
                status: "error",
                message: "Email is already registered."
            }, 400);
        }

        // Secure UUID v4 generation
        var hashedPassword:String = Hash.make(password);

        user = User.query.create(["fullname" => fullname, "email" => email, "password" => hashedPassword]);
        if(user == null) {
            return ResponseBuilder.asJson({
                status: "error",
                message: "Failed to register user."
            }, 500);
        }

        auth().login(user);

        return {
            status: "success",
            message: "User registered successfully."
        };
    }
}
