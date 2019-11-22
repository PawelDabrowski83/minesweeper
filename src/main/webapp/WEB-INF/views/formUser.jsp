<%--
  Created by IntelliJ IDEA.
  User: paweld
  Date: 22.11.2019
  Time: 21:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Form User</title>
</head>
<body>

    <form:form modelAttribute="userDto">
        <form:hidden path="id"/>
        <form:hidden path="created"/>
        First Name: <form:input path="firstName"/><form:errors path="firstName"/><br/>
        Last Name: <form:input path="lastName"/><form:errors path="lastName"/><br/>
        <input type="submit" value="Save"/>
    </form:form>

    <p><a href="${pageContext.request.contextPath}/user/manage">Back to all Users</a></p>

</body>
</html>
