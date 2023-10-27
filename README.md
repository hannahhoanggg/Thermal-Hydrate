# Thermal-Hydrate 

A full stack web application for health enthusiasts who want to purchase different brands of insulated tumblers.

## Purpose Behind The Application 

The purpose behind creating this website was to improve my own health by staying hydrated and drinking more water. As I explored various insulated tumbler brands, my interest grew, and I realized that there was a need for a platform where people could access a variety of brands in one place. So, I developed this website to provide others with the option to choose from multiple tumbler brands and expand their choices beyond just one primary brand.

### Explore My Website 

http://thermal-hydrate-dev.us-west-2.elasticbeanstalk.com/

### Features 

1) User can view the product catalog
2) User can view details about a product
3) User can create an account
4) User can add a product to their shopping cart
5) User can remove a product from their shopping cart 
6) User can update their shopping cart 
7) User can checkout from the shopping cart 

### Technologies Used 

* React.js
* PostgreSQL
* Node.js
* Express
* Tailwind CSS
* HTML5
* AWS Elastic Beanstalk
* Dbdiagram

### Preview 

![1](https://github.com/hannahhoanggg/Thermal-Hydrate/assets/136301731/23404225-0daf-4e48-9ca9-08c92be0f5f3)


#### Getting Started

1. Clone the repository.
2. Install all dependencies with `npm install`.
3.. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```
4.. Create database 
   ```sh
   createdb ThermalHydrate
   ```
5. In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step
6. While you are editing `server/.env`, also change the value of `TOKEN_SECRET` to a custom value, without spaces.
7. Start all the development servers with the `"dev"` script:
   ```sh
   npm run dev
   ```
8. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

**Happy coding!!!!**

---

