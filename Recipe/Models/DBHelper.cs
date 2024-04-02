using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Recipe.Models
{
    public class DBHelper
    {
        private SqlConnection con;
        private SqlCommand cmd;
        private SqlDataAdapter adapter;
        public DBHelper()
        {
            con = new SqlConnection();
        }
        public SqlConnection Connect(string conString)
        {
            con.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;
            return con;
        }

        public DBResponse DtabaseCrud(string procedureName, List<SqlParameter> mList = null)
        {
            try
            {
                using (con = Connect("ConnectionString"))
                {
                    using (cmd = new SqlCommand(procedureName, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Clear();
                        cmd.CommandTimeout = 0;
                        if (mList != null)
                        {
                            foreach (SqlParameter param in mList)
                            {
                                cmd.Parameters.AddWithValue(param.ParameterName, param.Value);
                            }
                        }
                        using (adapter = new SqlDataAdapter(cmd))
                        {
                            using (DataSet ds = new DataSet())
                            {

                                adapter.Fill(ds);
                                return new DBResponse { Result = true, DataResult = ds };
                            }
                        }
                    }
                }
            }
            catch (Exception ee)
            {
                return new DBResponse { Result = false, ExceptionMessage = ee.Message };
            }
        }
    }

    public class DBResponse
    {
        public bool Result { get; set; }
        public string ExceptionMessage { get; set; }
        public DataSet DataResult { get; set; }
    }
}