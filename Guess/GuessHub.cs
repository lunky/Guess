using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Guess.Annotations;
using Microsoft.AspNet.SignalR;

namespace Guess
{
	[UsedImplicitly]
	public class GuessHub : Hub
	{
		private static readonly  ConnectionMapping<GuessConnection> Connections = new ConnectionMapping<GuessConnection>(); 
		private static readonly List<string> LoggedIn = new List<string>();
		private static int _counter;

		private string UserName
		{
			get
			{ 
				var name = Context.ConnectionId;
				return name==string.Empty ? "anonymous"+_counter: name;
			}
		}

		public override Task OnConnected()
		{
			_counter += 1;
			LoggedIn.Add(UserName);
			Connections.Add(UserName, new GuessConnection(UserName, Context.ConnectionId)); 
			Debug.WriteLine("OnConnected");
			Clients.All.GetUsers();
			return base.OnConnected();
		}
		public override Task OnDisconnected()
		{

			Connections.Remove(Context.ConnectionId);

			return base.OnDisconnected();
		}

		public override Task OnReconnected()
		{
			Connections.Add(UserName, new GuessConnection(UserName, Context.ConnectionId));
			return base.OnReconnected();
		}

		[UsedImplicitly]
		public void Guess(string name, int guess)
		{
			Clients.All.broadcastMessage(name, guess);
			Debug.WriteLine("Guess " + name + " " + guess);
		}

		[UsedImplicitly]
		public void Clear()
		{
			Connections.Reset();
			Clients.All.GetUsers();
		}

		[UsedImplicitly]
		public IEnumerable<GuessConnection> GetUsers()
		{
			Debug.WriteLine("GetUsers");
			var connections = Connections.GetConnections();
			return connections;
		} 
	}

	public class GuessConnection:IResetable
	{
		public GuessConnection(string name, string connectionId)
		{
			Name = name;
			ConnectionId = connectionId;
			Reset();
		}
		public string Name { get; set; }
		public string ConnectionId { get; set; }
		public int Guess { get; set; }

		public bool Ready
		{
			get { return Guess > -1; }
		}

		public void Reset()
		{
			Guess = -1;
		}
	}
}