#include <MainLogic.h>

MainLogic::MainLogic()
{
    qDebug("MainLogic::MainLogic() start ");
}

MainLogic::~MainLogic()
{
}

void MainLogic::execute()
{
    qDebug("execute() start");

    webSocketServer.init();
    ipsServer.initReceiveSock();
}
