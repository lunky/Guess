using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace Guess
{
	public class GuessHub : Hub
	{
		private static List<string> LoggedIn;

		public GuessHub()
		{
			LoggedIn = new List<string>();
		}

		public override Task OnConnected()
		{
			var userName = Context.User.Identity.Name;
			LoggedIn.Add(userName);
			Debug.WriteLine("OnConnected");
			return base.OnConnected();
		}

		public List<string> GetUsers()
		{
			Debug.WriteLine("GetUsers");
			return LoggedIn;
		} 
	}
}