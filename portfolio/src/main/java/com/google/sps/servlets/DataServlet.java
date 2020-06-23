// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.Task;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;



/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    //Initializing and adding in arrayList
    private ArrayList<String> commentsArr;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
        commentsArr = new ArrayList<String>();
        commentsArr.add(request.getParameter("fname"));
        commentsArr.add(request.getParameter("lname"));
        commentsArr.add(request.getParameter("comment"));

        
        response.getWriter().println("Thank you for your feedback!");
        response.setContentType("text/html;");


        long timestamp = System.currentTimeMillis();
        final String firstName = request.getParameter("fname");
        final String lastName = request.getParameter("lname");
        final String commentPosted = request.getParameter("comment");
        

        //Creating an entity
        Entity taskEntity = new Entity("Comments");
        taskEntity.setProperty("First Name", firstName);
        taskEntity.setProperty("Last Name", lastName);
        taskEntity.setProperty("Timestamp", timestamp);
        taskEntity.setProperty("Comment Posted", commentPosted);

        
        //Storing the Entity in datastore
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(taskEntity);
        
        response.sendRedirect("/contact.html");

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Comments");

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();   
        PreparedQuery results = datastore.prepare(query);

        //Loads all the comments to an arrayList
        List<Task> tasks = new ArrayList<>();
<<<<<<< HEAD
        for (Entity entity : results.asIterable()) {
            long id = entity.getKey().getId();
            String fname = (String) entity.getProperty("First Name");
            String lname = (String) entity.getProperty("Last Name");
            long timeStamp = (long) entity.getProperty("Timestamp");
            String postedComment = (String) entity.getProperty("Comment Posted");
            
            Task task = new Task(id, fname, lname, timeStamp, postedComment);
            tasks.add(task);

        }
=======
        
            for (Entity entity : results.asIterable()) {
        long id = entity.getKey().getId();
        String fname = (String) entity.getProperty("First Name");
        String lname = (String) entity.getProperty("Last Name");
        long timeStamp = (long) entity.getProperty("Timestamp");
        String postedComment = (String) entity.getProperty("Comment Posted");
      
        Task task = new Task(id, fname, lname, timeStamp, postedComment);
        tasks.add(task);
    }
>>>>>>> 3127756de202457d3313902a36f8dda609bb7e29

        Gson gson = new Gson();

        // Creates a sublist of the original array list
        List<Task> maxCommentTask = tasks.subList(0, Math.min(tasks.size(), getNumOfComments(request)));
        response.setContentType("application/json;");
        String toJson = gson.toJson(maxCommentTask);
        response.getWriter().println(toJson);

    }
<<<<<<< HEAD
    //Parses the string from the queryString to a int
    private int getNumOfComments(HttpServletRequest request) {
=======
        //Parses the string from the queryString to a int
         private int getNumOfComments(HttpServletRequest request) {
>>>>>>> 3127756de202457d3313902a36f8dda609bb7e29

        //Get the user input from form
        final String PARAM_COMMENT_NUM = request.getParameter("maxComments");

        //Convert the input to a int
        int commentLimit = 0;
        try {
            commentLimit = Integer.parseInt(PARAM_COMMENT_NUM);
        } catch (NumberFormatException e) {
            System.err.println("Could not convert to int: " + PARAM_COMMENT_NUM);
            return -1;
        }
        return commentLimit;
    }

/**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
    }


}
