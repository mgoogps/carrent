using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class Dictionary
	{ 

		public int? CategoryID { get; set; }

		public string DataText { get; set; }

		public int? DataValue { get; set; }

		public int? ParentID { get; set; }

		public int? SortOrder { get; set; }

		public int? AccountID { get; set; }

	}
}
