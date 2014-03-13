#ifndef UDPSERVER_H
#define UDPSERVER_H

#include <QtCore>
#include <QUdpSocket>

class UdpServer : public QObject
{
    Q_OBJECT

public:
    UdpServer();
    ~UdpServer();

    void initReceiveSock();

private:
    QUdpSocket *udpSock;
    QUdpSocket *udpReceiveSock;

private slots:
    void onReadPendingUdpDatagrams();

};

#endif // UDPSERVER_H
