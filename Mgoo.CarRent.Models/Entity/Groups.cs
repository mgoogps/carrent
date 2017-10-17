using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class Groups
	{
		public int GroupID { get; set; }

		public string GroupName { get; set; }

		public int? UserID { get; set; }

		public string Username { get; set; }

		public string Description { get; set; }

		public DateTime? Created { get; set; }

		public int? GroupType { get; set; }

		public int? AccountID { get; set; }

		public int? Deleted { get; set; }

	}
}
