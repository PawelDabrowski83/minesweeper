<%--
  Created by IntelliJ IDEA.
  User: paweld
  Date: 22.11.2019
  Time: 22:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>All Scores</title>
</head>
<body>

    <table>
        <caption>All Scores</caption>
        <tr>
            <th>Points</th>
            <th>User</th>
            <th>Actions</th>
        </tr>
        <c:forEach items="${scores}" var="score">
            <tr>
                <td>${score.points}</td>
                <td>${score.user.fullname}</td>
                <td><a href="/score/edit/${score.id}">EDIT</a> <a href="/score/delete/${score.id}">DELETE</a></td>
            </tr>
        </c:forEach>
    </table>

    <p><a href="${pageContext.request.contextPath}/score/add">Add new Score</a></p>

    <p><a href="${pageContext.request.contextPath}/">Go back to Main</a></p>
</body>
</html>
