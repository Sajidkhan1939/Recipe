using Recipe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Recipe.Models;
namespace Recipe.Controllers
{
    public class HomeController : Controller
    {
        private readonly RecipeRepositories repo;
        public HomeController()
        {
            repo = new RecipeRepositories();
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AdRecipe(int? id,string title, string ingredients)
        {
            try
            {
               var recipes= repo.AdRecipe(id,title, ingredients);
                return Json(new { success = true, recipes = recipes });
            }
            catch (Exception ex)
            {

                return Json(new { success = false, message = ex.Message });
            }            
        }

        public ActionResult GetRecipe(int? id)
        {
            try
            {
                var recipe =repo.GetRecipe(id);
                return Json(recipe, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ActionResult DeleteRecipe(int id)
        {
            try
            {
                repo.DeleteRecipe(id);
                return RedirectToAction("GetRecipe");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ActionResult RomoveAll()
        {
            try
            {
                repo.RemoveAllRecipe();
                return Json(new JsonResult { });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}