using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class WeChatUsers
	{
		public int ID { get; set; }

		public int? UserID { get; set; }

		public string LoginName { get; set; }

		public string OpenID { get; set; }

		public DateTime? CreateTime { get; set; }

		public DateTime? UpdateTime { get; set; }

		public string PushMsg { get; set; }

		public int? Deleted { get; set; }

	}
}
