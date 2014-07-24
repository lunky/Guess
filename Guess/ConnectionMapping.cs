using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;

namespace Guess
{
	public class ConnectionMapping<T> where T:IGuessConnection
	{
		private readonly Dictionary<string, T> _connections =
			new Dictionary<string, T>();

		public void Add(string key, T connection)
		{
			lock (_connections)
			{
				if (!_connections.ContainsKey(key))
				{
					_connections.Add(key, connection);
				}
			}
		}

		public IEnumerable<T> GetConnections()
		{
			return _connections.Values.AsEnumerable();
		}

		public void Remove(string key)
		{
			lock (_connections)
			{
				if (!_connections.ContainsKey(key))
				{
					return;
				}

				lock (_connections)
				{
					_connections.Remove(key);
				}
			}
		}

		public void Reset()
		{
			foreach (var conn in _connections.Values)
			{
				conn.Reset();
			}
		}

		public void SetVote(string key, int guess)
		{
			lock (_connections)
			{
				if (_connections.ContainsKey(key))
				{
					var conn = _connections[key];
					conn.SetVote(guess);
					_connections[key] = conn;
				}
			}
		}
	}
}