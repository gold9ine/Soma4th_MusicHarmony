#include "JsonParser.h"
#include <QJsonObject>
#include <QJsonDocument>

JsonParser::JsonParser()
{
}

void JsonParser::newMessage()
{

}

QString JsonParser::read(const QString &rawMessage)
{
    QJsonDocument json = QJsonDocument::fromJson(rawMessage.toUtf8());
    QJsonObject obj = json.object();
    printf("%s\n", rawMessage.toStdString().c_str());
    return obj.begin().value().toString();
}

void JsonParser::write(const QJsonObject &json) const
{

}
