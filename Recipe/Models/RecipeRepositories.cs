using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Recipe.Models
{
    public class RecipeRepositories
    {
        private readonly DBHelper db = new DBHelper();
        public List<Recipe> AdRecipe(int? id,string title , string ingrediants)
        {
            List<Recipe> recipes = new List<Recipe>();
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@id", id),
                    new SqlParameter("@title", title),
                    new SqlParameter("@ingredients", ingrediants),
                };
                var result = db.DtabaseCrud("AddRecipe", parameters);
                if (result.Result && result.DataResult.Tables.Count > 0)
                {
                    var dataTable = result.DataResult.Tables[0];
                    foreach (DataRow row in dataTable.Rows)
                    {
                        Recipe recipe = new Recipe();
                        recipe.ID = Convert.ToInt32(row["ID"]);
                        recipe.Title = row["Title"].ToString();
                        recipe.Ingrediants = row["Ingrediants"].ToString();
                        recipes.Add(recipe);
                    }
                }
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);              
            }
            return recipes;
        }
        public List<Recipe> GetRecipe(int? id)
        {
            try
            {
                List<Recipe> recipes = new List<Recipe>();

                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@id", id)
                };

                var result = db.DtabaseCrud("GetRecepie", parameters);

                if (result.Result && result.DataResult.Tables.Count > 0)
                {
                    var dataTable = result.DataResult.Tables[0];

                    if (dataTable.Rows.Count > 0)
                    {
                        foreach (DataRow row in dataTable.Rows)
                        {
                            Recipe recipe = new Recipe
                            {
                                ID = Convert.ToInt32(row["ID"]),
                                Title = Convert.ToString(row["Title"]),
                                Ingrediants = Convert.ToString(row["Ingrediants"])
                            };

                            recipes.Add(recipe);
                        }

                        return recipes;
                    }
                    else
                    {
                        return recipes;
                    }
                }
                else
                {

                    return null; 
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public void DeleteRecipe(int id)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@id", id),
                };
                var result = db.DtabaseCrud("deleteRecipe", parameters);
                if (result.Result && result.DataResult.Tables.Count > 0)
                {
                    var dataTable = result.DataResult.Tables[0];
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public void RemoveAllRecipe()
        {
            try
            {             
                var result = db.DtabaseCrud("removeallRecipe");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}