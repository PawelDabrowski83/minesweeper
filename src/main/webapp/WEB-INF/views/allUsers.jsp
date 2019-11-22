<%--
  Created by IntelliJ IDEA.
  User: paweld
  Date: 22.11.2019
  Time: 21:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>All Users</title>
</head>
<body>

    <table>
        <caption>All Users</caption>
        <tr>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>created</th>
            <th>actions</th>
        </tr>
        <c:forEach items="${users}" var="user">
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.created}</td>
                <td><a href="/user/edit/${user.id}">EDIT</a> <a href="/user/delete/${user.id}">DELETE</a></td>
            </tr>
        </c:forEach>
    </table>

    <p><a href="${pageContext.request.contextPath}/user/add">Add new User</a></p>

    <p><a href="${pageContext.request.contextPath}/">Go back to Main</a></p>


</body>
</html>
