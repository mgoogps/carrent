using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Mgoo.CarRent.Common;

namespace Mgoo.CarRent.DAL
{
   public class DBHelper
    {
        private DBHelper() { }

        public static DataTable ExecuteDataTable(string strSql, params SqlParameter[] parameterValues)
        {
            try
            {
                //Dapper
                DataSet ds = SqlHelper.ExecuteDataset(SqlHelper.GetConnSting(),CommandType.Text, strSql, parameterValues);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                Common.Log.Error("Error Code 100010", ex);
                throw ex;
            }
        }
        public static int ExecuteNonQuery(string strSql, params SqlParameter[] parameterValues)
        {
            try
            {
                return SqlHelper.ExecuteNonQuery(SqlHelper.GetConnSting(),CommandType.Text, strSql, parameterValues); 
            }
            catch (Exception ex)
            {
                Common.Log.Error("Error Code 100011", ex);
                throw ex;
            }
        }
        public static object ExecuteScalar(string strSql, params SqlParameter[] parameterValues)
        {
            try
            {
                return SqlHelper.ExecuteScalar(SqlHelper.GetConnSting(), CommandType.Text, strSql, parameterValues);
            }
            catch (Exception ex)
            {
                Common.Log.Error("Error Code 100012", ex);
                throw ex;
            }
        }
        public static void FillDataset(string strSql,DataSet ds, params string[] parameterValues)
        {
            try
            {
                  SqlHelper.FillDataset(SqlHelper.GetConnSting(), CommandType.Text, strSql,ds, parameterValues);
            }
            catch (Exception ex)
            {
                Common.Log.Error("Error Code 100013", ex);
                throw ex;
            }
        }


    }
}
