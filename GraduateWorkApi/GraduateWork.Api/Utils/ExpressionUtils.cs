using System.Linq.Expressions;

namespace GraduateWorkApi.Utils;

internal static class ExpressionUtils
{
    public static Expression<Func<T, bool>> And<T>(
        Expression<Func<T, bool>> first,
        Expression<Func<T, bool>> second)
    {
        var paramExpression = Expression.Parameter(typeof(T));
        var firstExpression = ReplaceParam(first, paramExpression);
        var secondExpression = ReplaceParam(second, paramExpression);

        return Expression.Lambda<Func<T, bool>>(
            Expression.AndAlso(firstExpression, secondExpression),
            paramExpression);
    }
    
    private static Expression ReplaceParam<T>(
        Expression<Func<T, bool>> lambda,
        ParameterExpression paramExpression)
    {
        var replacer = new ExpressionParameterVisitor(lambda.Parameters.First(), paramExpression);

        return replacer.Visit(lambda.Body);
    }
}