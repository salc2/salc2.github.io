---
layout: post
title:  "Scala is not a mythical monster! Using scala with Spring boot"
date:   2015-11-07 17:22:22
categories: scala
---

![Head post](/assets/scalaspringhead.jpg)


##Introduction

Why mystical monster?

Java programmers tend to think they can't use scala as usually they use java, Scala is very different from Java it has things like data inference, functional approach, and syntactic sugar, many _weird_ things, and for these reason are inconsistent. Sometimes they think to develop common application like Web applications, RESTful services we have to do magic and use non-traditional tools and approaches entirely new and unintelligible.

The truth is that everything we do with Java, we can also make them with Scala. 
So why not use it and take advantage of its features.
For example Scala is a pure object-oriented language, everything in Scala is an object even primitives. 
In Scala, we can do things like: `1 to 10` it returns a data structure of type `Range`, indeed it returns a subtype of `Range` called `Inclusive`, a type of collection and this happens because `1` is an object of the `Int` class which has a method `to(end: Int):Inclusive` that would be equivalent to a Java method signature `Inclusive to(Integer end);` The `1 to 10` is syntactic sugar for `1.to(10)`. It can be written both.

**So this in java**

{% highlight java %}
for(int i = 1; i<=10; i++){
   System.out.print(i);
}
{% endhighlight %}

**Could be this in scala**

{% highlight scala %}
1 to 10 foreach(print)
{% endhighlight %}

Scala has many cute things like that. So continuing with the main topic, lets to use Scala and Spring boot to build like a RESTful web services.

##What we’ll build

we’ll build a service that will accept HTTP GET requests at:

`http://localhost:8080/greeting`

and respond with a JSON representation of a greeting:

{% highlight json %}
{
    "id": 1,
    "content": "Hello, World!"
}
{% endhighlight %}

You can customize the greeting with an optional name parameter in the query string:

`http://localhost:8080/greeting?name=Javier`

The `name` parameter value overrides the default value of _"World"_ and is reflected in the response:

{% highlight json %}
{
    "id": 1,
    "content": "Hello, Javier!"
}
{% endhighlight %}

##What we’ll need

- About 15 minutes
- Your favorite text editor
- JDK 1.8 or later
- Gradle or Sbt

##Create the directory structure

In a project directory of your choosing, create the following subdirectory structure; 
for example, with 

`mkdir -p scala-spring/src/main/scala/hello` on nix systems:

{% highlight bash %}
scala-spring
└── src
    └── main
        └── scala
            └── hello


{% endhighlight %}

##Create a build file for you build tool. Gradle or Sbt

###If you are working with `Gradle`

Create a file `scala-spring/build.gradle`:
{% highlight groovy %}
//for gradle ONLY
apply plugin: 'scala'
apply plugin: 'application'

mainClassName = "hello.Application"

dependencies{
        compile 'org.scala-lang:scala-library:2.11.7'
        compile 'org.springframework.boot:spring-boot-starter-web:1.2.5.RELEASE'
}

repositories {
    mavenCentral()
}


{% endhighlight %}


###If you are working with `Sbt`

Create a file `scala-spring/build.sbt` with:

{% highlight scala %}
//for sbt ONLY
lazy val root = (project in file(".")).
  settings(
    name := "scala-spring",
    version := "1.0",
    scalaVersion := "2.11.7"
  )


libraryDependencies ++= Seq(
  "org.springframework.boot" % "spring-boot-starter-web" % "1.2.5.RELEASE"
)

{% endhighlight %}
> Note: You must to create one or another, not both. It depends of the build tool you are using.


##Create a resource representation class

The service will handle `GET` requests for `/greeting`, optionally with a `name` parameter in the query string. The `GET` request should return a `200 OK` response with `JSON` in the body that represents a greeting. It should look something like this:

{% highlight json %}
{
    "id": 1,
    "content": "Hello, World!"
}
{% endhighlight %}

To model the greeting representation, you create a resource representation class. 
Provide a plain old java object with fields, constructors, and accessors. 
Create a file `src/main/scala/hello/Greeting.scala`
{% highlight scala %}
package hello
                               
case class Greeting(var id:Long, var content:String){
        def getId = id
        def setId(_id:Long) = id = _id  
        def getContent = content        
        def setContent(_content:String) = content = _content
} 
{% endhighlight %}
> Note: From the functional's point view this class would be wrong because objects 
> instanced from this class will be mutable. 
> But things like ORM or JSON parse need getters and setters. 

Next you create the resource controller that will serve these greetings.

##Create a resource controller

`src/main/scala/hello/GreetingController.scala`
{% highlight scala %}
package hello

import java.util.concurrent.atomic.AtomicLong
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class GreetingController {
    val counter = new AtomicLong()  

    @RequestMapping(value = Array("/greeting"))
    def greeting(@RequestParam(value = "name", defaultValue = "World") name:String) = {
        val id = counter.incrementAndGet()
        Greeting(id, s"Hello, $name" )  
        }
    
}

{% endhighlight %}

##Make the application executable

`src/main/scala/hello/Application.scala`
{% highlight scala %}
package hello

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class MySpringApplication

object Application {
    def main(args:Array[String]):Unit =
        SpringApplication.run(classOf[MySpringApplication])
}

{% endhighlight %}

##Running the application

If you are using `Sbt`

`sbt run`

If you are using `Gradle`

`gradle run`

__Testing the services__

[http://localhost:8080/greeting](http://localhost:8080/greeting)

[http://localhost:8080/greeting?name=Javuer](http://localhost:8080/greeting?name=Javier)

And this is it!

[Github source code here](https://github.com/salc2/scala-spring)

##Resources
- [Scala API Docs](http://www.scala-lang.org/api/2.11.7/)
- [Spring boot API Docs](http://docs.spring.io/spring-boot/docs/current/api/)
- [Spring boot RESTful Tutorial](https://spring.io/guides/gs/rest-service/)
