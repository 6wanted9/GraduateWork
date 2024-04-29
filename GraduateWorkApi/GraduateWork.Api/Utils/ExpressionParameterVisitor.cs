using System.Linq.Expressions;

namespace GraduateWorkApi.Utils;

internal class ExpressionParameterVisitor : ExpressionVisitor
{
    private readonly Expression _oldValue;
    private readonly Expression _newValue;

    public ExpressionParameterVisitor(Expression oldValue, Expression newValue)
    {
        _oldValue = oldValue;
        _newValue = newValue;
    }

    public override Expression Visit(Expression node)
    {
        if (node == _oldValue)
        {
            return _newValue;
        }

        return base.Visit(node);
    }
}