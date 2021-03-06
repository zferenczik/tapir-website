---
title: Build Systems
description: tapir supports the usage of Apache Maven.
permalink: /docs/usingtapir/build-systems/
---

## Dependency Management

Each release of <i>tapir</i> defines a list of dependencies. In practice, you
do not need to provide a version for any of these dependencies in your
build configuration as <i>tapir</i> is managing this for you. When you upgrade
<i>tapir</i> itself, these dependencies will be upgraded as well in a
consistent way.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  You can still specify a version and override <i>tapir's</i> recommendations if
  you feel that this is necessary.
  </div>
</div>

We recommend the usage of Maven. Gradle might work as well, but is not officially supported.

Maven users can use the *tapir-starter-module* to obtain sensible
defaults. The project provides the following features:

-   Java 1.8 as default compiler level
-   UTF-8 source encoding
-   A Dependency Management section, allowing you to omit
    *&lt;version&gt;* tags for common dependencies, inherited by
    *tapir-dependencies* POM
-   A Dependency section containing some must-have dependencies
-   The Maven filtering is changed to use `@..@` placeholders

## Inheriting the Starter Parent

To configure your project to inherit from the
tapir-*starter-module *simply set the *parent*:

``` xml
<!-- Inherit defaults from tapir -->
<parent>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-starter-module</artifactId>
    <version>{{ site.latesttapirversion }}</version>
</parent>
```

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  You should only need to specify the <i>tapir</i> version number on this
  dependency. If you import additional starters or add dependencies, you
  can safely omit the version number.
  </div>
</div>

With that setup, you can also override individual dependencies by
overriding a property in your own project. For instance, to upgrade to
another Selenium version you would add the following to your *pom.xml*.

``` xml
<properties>
    <selenium.version>3.4.0</selenium.version>
</properties>
```
<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
    Check the <i>tapir-dependencies</i> pom for a list of supported properties.
  </div>
</div>

## Using <i>tapir</i> Without the Parent POM

If you don’t want to use the tapir-*starter-module*, you can still keep
the benefit of the dependency management (but not the plugin management)
by using a dependency with the import scope:

``` xml
<dependencyManagement>
     <dependencies>
        <dependency>
            <!-- Import dependency management from tapir -->
            <groupId>de.bmiag.tapir</groupId>
            <artifactId>tapir-dependencies</artifactId>
            <version>{{ site.latesttapirversion }}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

That setup does not allow you to override individual dependencies using
a property as explained above.

## Additional Starters

There a more specialized starters provided by <i>tapir</i>. Those starters are
explained below.

### tapir-starter-selenium-allure

If you would like to use <i>tapir's</i> Selenium implementation and the Allure
report capabilities you might want to
use *tapir-starter-selenium-allure*. The project provides the following
features:

-   Inherits from tapir-starter-module
-   Configures the following Maven Plugins:
    -   maven-surefire-plugin
    -   maven-failsafe-plugin
    -   allure-maven-plugin
    -   jetty-maven-plugin
-   Configures the following Reporting Plugins:
    -   allure-maven-plugin
-   Specifies compile-time and runtime dependencies which are needed for
    Selenium and Allure usage
