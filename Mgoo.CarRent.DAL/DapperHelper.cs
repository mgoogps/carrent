using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Mgoo.CarRent.DAL
{
    /// <summary>
    /// Dapper Helper
    /// create by ben.jiang 2017/5/21
    /// </summary>
    public partial class DapperDataAsync
    {
        /// <summary>
        /// DB Connetction String
        /// </summary>
        private static string connectionString = ConfigurationManager.ConnectionStrings["conntentString1"].ToString();
        /// <summary>
        /// Get Entity (int key)
        /// </summary> 
        public static async Task<T> GetAsync<T>(int id, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.GetAsync<T>(id, transaction, commandTimeout);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Get Entity (long key)
        /// </summary> 
        public static async Task<T> GetAsync<T>(long id, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.GetAsync<T>(id, transaction, commandTimeout);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Get Entity (guid key)
        /// </summary> 
        public static async Task<T> GetAsync<T>(System.Guid id, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.GetAsync<T>(id, transaction, commandTimeout);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Get Entity (string key)
        /// </summary> 
        public static async Task<T> GetAsync<T>(string id, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.GetAsync<T>(id, transaction, commandTimeout);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Get All List
        /// </summary> 
        public static async Task<IEnumerable<T>> GetAllAsync<T>() where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.GetAllAsync<T>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Get List With SQL
        /// </summary> 
        public static async Task<IEnumerable<T>> GetListAsync<T>(string sql) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.QueryAsync<T>(sql, commandType: CommandType.Text);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Insert Entity
        /// </summary>
        public static async Task<int> InsertAsync<T>(T model, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.InsertAsync<T>(model, transaction, commandTimeout);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Update Entity
        /// </summary>
        public static async Task<T> UpdateAsync<T>(T model, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    bool b = await conn.UpdateAsync<T>(model, transaction, commandTimeout);
                    if (b) { return model; }
                    else { return null; }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Delete Entity
        /// </summary>
        public static async Task<T> DeleteAsync<T>(T model, IDbTransaction transaction = null, int? commandTimeout = null) where T : class, new()
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    bool b = await conn.DeleteAsync<T>(model, transaction, commandTimeout);
                    if (b) { return model; }
                    else { return null; }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///Execute SQL Statement
        /// </summary> 
        public static async Task<int> ExecSqlAsync<T>(string sql)
        {
            try
            {
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.ExecuteAsync(sql);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region For Project
        /// <summary>
        /// Get Entity By ProcInstID
        /// </summary> 
        public static async Task<T> GetByProcInstIdAsync<T>(string procInstId) where T : class, new()
        {
            try
            {
                string tbname = typeof(T).Name;
                string sql = string.Format("SELECT * FROM {0} WHERE ProcInstID='{1}'", tbname, procInstId);
                using (var conn = new SqlConnection(connectionString))
                {
                    return await conn.QueryFirstOrDefaultAsync<T>(sql);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 分页查询
        ///// <summary>
        //        /// 分页查询(为什么不用out，请参考：http://www.cnblogs.com/dunitian/p/5556909.html)
        //        /// </summary>
        //        /// <param name="sql">查询语句</param>
        //        /// <param name="p">动态参数</param>
        //        /// <param name="sqlTotal">total语句</param>
        //        /// <param name="p2">Total动态参数</param>
        //        /// <returns></returns>
        //public static async Task<string> PageLoadAsync<T>(string sql, object p = null, string sqlTotal = "", object p2 = null)
        //{
        //    var rows = await QueryAsync<T>(sql.ToString(), p);
        //    var total = rows.Count();
        //    if (!sqlTotal.IsNullOrWhiteSpace()) { total = await ExecuteScalarAsync<int>(sqlTotal, p2); }
        //    return new { rows = rows, total = total }.ObjectToJson();
        //}
        #endregion
    }
}
