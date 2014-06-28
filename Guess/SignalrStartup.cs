using Guess;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalrStartup))]
namespace Guess
{

	public class SignalrStartup
	{
		public void Configuration(IAppBuilder app)
		{
			app.MapSignalR();
		}		 
	}
}
