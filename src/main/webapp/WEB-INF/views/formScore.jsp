<%--
  Created by IntelliJ IDEA.
  User: paweld
  Date: 22.11.2019
  Time: 22:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Form Score</title>
</head>
<body>

    <form:form modelAttribute="scoreDto">
        <form:hidden path="id"/>
        <form:hidden path="created"/>
        Points: <form:input path="points"/><form:errors path="points"/><br/>
        User: <form:select path="user" items="${users}" itemLabel="fullname" itemValue="id"/><br/>
        <input type="submit" value="Save"/>
    </form:form>

    <p><a href="${pageContext.request.contextPath}/score/manage">Go back to all Scores</a></p>
</body>
</html>
