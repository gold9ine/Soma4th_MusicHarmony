#ifndef JSONPARSER_H
#define JSONPARSER_H

#include <QtCore>
#include <QJsonObject>
#include <QString>

class JsonParser : public QObject
{
    Q_OBJECT

public:
    JsonParser();

    void newMessage();
    QString read(const QString &rawMessage);
    void write(const QJsonObject &json) const;

};

#endif // JSONPARSER_H
