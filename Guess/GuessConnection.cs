namespace Guess
{
	public class GuessConnection:IGuessConnection
	{
		public GuessConnection(string name, string connectionId)
		{
			Name = name;
			ConnectionId = connectionId;
			Reset();
		}

		public string ConnectionId { get; set; }
		public string Name { get; set; }
		public int Guess { get; set; }


		public bool Ready
		{
			get { return Guess > -1; }
		}

		public void Reset()
		{
			Guess = -1;
		}

		public void SetVote(int vote)
		{
			Guess = vote;
		}
	}
}