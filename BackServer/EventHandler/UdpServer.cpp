#include <UdpServer.h>

UdpServer::UdpServer()
{
    qDebug("UdpServer::UdpServer() start");
    udpSock = new QUdpSocket();
}

UdpServer::~UdpServer()
{
}

void UdpServer::initReceiveSock()
{
    qDebug("UdpServer::initReceiveSock() start");
    udpReceiveSock = new QUdpSocket(this);
    udpReceiveSock->bind(8755);

    connect(udpReceiveSock, SIGNAL(readyRead())
           , this, SLOT(onReadPendingUdpDatagrams()));
}

void UdpServer::onReadPendingUdpDatagrams()
{
    while(udpReceiveSock->hasPendingDatagrams())
    {
        QByteArray datagram;
        datagram.resize(udpReceiveSock->pendingDatagramSize());
        QHostAddress sender;
        quint16 senderPort;

        udpReceiveSock->readDatagram(datagram.data(), datagram.size()
                                    , &sender, &senderPort);

        qDebug("Response Data size : %d", datagram.size());
        qDebug("Response Message : %s", datagram.data());
    }
}
