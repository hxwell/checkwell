package hx.well.middleware;
import hx.well.http.CookieData;
import hx.well.facades.Environment;
import haxe.Exception;
class CustomSessionMiddleware extends SessionMiddleware {
    public override  function cookieData(key:String, value:String, encrypt:Bool):CookieData
    {
        var appDomain:String = Environment.get("APP_DOMAIN", null);
        if(appDomain == null)
            throw new Exception("APP_DOMAIN environment variable is not set.");

        var cookieData:CookieData = super.cookieData(key, value, encrypt);
        cookieData.domain = '.${appDomain}';
        cookieData.sameSite = "None";
        return cookieData;
    }
}
