using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmberPOC.Startup))]
namespace EmberPOC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
